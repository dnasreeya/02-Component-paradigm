import React from "react";
import { NextPage } from "next";
import { CatPost } from "./types/Cats";
import Link from "next/link";
import { Table, Row, Col, Button} from 'antd';
import {SmileOutlined} from '@ant-design/icons';

interface StatProps {
  posts: CatPost[];
}

const Stat: NextPage<StatProps> = ({ posts }) => {
      
    // ***** Way 1 : For Loop   *****
      //   const accumulatedData = {};
      //   for (let index = 0; index < posts.length; index++ ){
      //     const element = posts[index];
      //     if (element.author in accumulatedData) {
      //       accumulatedData[element.author] += 1;
      //     } else {
      //       accumulatedData[element.author] = 1;
      //     }
      //   }
      //   console.log(posts, Object.entries(accumulatedData));

    // ***** Way 2 : Long Reduce   *****
      // const accumulatedData = posts.reduce((prevAccumulated, {author}) => {
      //   if(!(author in prevAccumulated)){
      //     prevAccumulated[author] = 0;
      //   }
      //   prevAccumulated[author] += 1;
      //   return prevAccumulated;
      //  }, 
      //  {}
      // );  

    // ***** Way 3 : Short Reduce   *****
      // const accumulatedData = posts.reduce(
      //   (prevAccumulated, {author}) => ({
      //     ...prevAccumulated,
      //     [author]: author in prevAccumulated ? prevAccumulated[author] +1 : 1,
      //   }),
      //   {}
      // );

    // ***** Way 4 : Very Short Reduce   *****
    const accumulatedData = posts.reduce(
      (acc, {author}) => ({
        ...acc,
        [author]: author in acc ? acc[author] +1 : 1,
      }),
      {}
    );
      
    const data = Object.entries(accumulatedData).map(
      ([author, number], index) =>({
          key: index,
          name: author,
          number,

      })
    );

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: ' The number of images',
            dataIndex: 'number',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.number - b.number, 
            //sortDirections: ['descend'],
        },
    ]

    return (
      <div>
            <br /><br />
            <Table columns={columns} dataSource={data} />

            <Row justify="center">
                <Col >
                    <Link href="/" passHref>
                        <Button type="primary" size="large" shape="round" icon={<SmileOutlined/> }> Back to Home Page </Button>
                    </Link>
                </Col>
            </Row>   
      </div>
    );
  }
  
 Stat.getInitialProps = async ({ req }) : Promise<StatProps> => {
    let host = "";
    if (req != undefined) {
      const {
        headers: { host: hostHeader },
      } = req;
      host = hostHeader;
    } else {
      host = "localhost:3000";
    }
    const res = await fetch(`http://${host}/api/getCats`);
    return { posts: await res.json() };
};

export default Stat;