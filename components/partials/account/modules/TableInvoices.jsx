import React, {useEffect, useState } from 'react';
import { Table, Button,} from 'antd';
import useEcomerce from '~/hooks/useEcomerce';
import Router from 'next/router';
import dateFormat from 'dateformat';

const TableInvoices = () => {
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const [data, setData] = useState([]);
 
const {orderHistory,getOrderHistoryResponse}=useEcomerce();

const columns = [
    {
      title: 'Order Number',
      dataIndex: 'OrderNumber',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Order status',
      dataIndex: 'OrderStatus',
    },
    {
      title: 'Order Date',
      dataIndex: 'CreatedOn',
    },
    {
        title: 'Order Total',
        dataIndex: 'OrderTotal',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          data.length >= 1 ? 
          (               
            <Button onClick={() => getRecord(record.OrderId)}>
                <a>Details</a>
            </Button>           
          ) : null,
      },
  ];
     
    useEffect(() => {                  
        if (orderHistory==null)
             getOrderHistoryResponse(); 
            
        if (orderHistory!=null)
            renderData();
           // console.log(">>>>!!!"+JSON.stringify(orderHistory));                    
    }, [orderHistory]);  

    function renderData()
    {
        var data=[];
        
        for (let j=0;j<orderHistory.length;j++)
        {
          for (let i = 0; i < orderHistory[j]["Orders"].length; i++) 
          {
              let record=JSON.parse(JSON.stringify(orderHistory[j]["Orders"][i]));
            
              data.push({
              key: i,
              OrderNumber:record["OrderNumber"],
              OrderStatus: record["OrderStatus"],
              CreatedOn: dateFormat(record["CreatedOn"], "mmmm dS, yyyy"),        //record["CreatedOn"],
              OrderTotal: record["OrderTotal"],            
              OrderId: record["Id"],            
              });            
          }
        }
        setData(data);
    }
    
    function getRecord (OrderId){     
      console.log("KEY------"+OrderId);
      Router.push({
        pathname: '/account/order-details/',
        query: {orderId: OrderId}
      })  

      //http://localhost:16595/orderdetails/6202528fd538ca12ca5b71d4
    };
  
    /*const onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', JSON.stringify(selectedRowKeys));
      setSelectedRowKeys(selectedRowKeys);
    };
      
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };*/
      return (
        <div>
          <div style={{ marginBottom: 16 }}> </div>          
          <Table columns={columns} dataSource={data} bordered />          
        </div>
      );
  }

export default TableInvoices;
