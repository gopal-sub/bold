import { AutoScalingClient, DescribeAccountLimitsCommand, DescribeAutoScalingInstancesCommand ,DescribeLoadBalancersCommand,DescribeAutoScalingGroupsCommand} from '@aws-sdk/client-auto-scaling';
import { error } from 'console';
import dotenv from 'dotenv';
import { EC2Client } from "@aws-sdk/client-ec2";
import {get_instance_ip, get_instance_id} from './services/instanceService'


dotenv.config()

if(process.env.AWS_ACCESS_KEY == undefined|| process.env.AWS_ACCESS_SECRET == undefined){
    throw error("env not loaded")
}

const config = { 
    region: "us-east-1",
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
}

const clientAS = new AutoScalingClient(config);
const client = new EC2Client(config);

async function get_instance_record(){
    // const input_param = {};
    // const command = new DescribeAccountLimitsCommand(input_param) ;
    // const responseAS = await clientAS.send(command);
    // console.log(responseAS)
    // const input = { // DescribeLoadBalancersRequest
    //     AutoScalingGroupName: [],
    // };



    // const response  = await get_instance_ip(["i-0cf9bff47c688b84f"], client);
    // console.log(response);

    const instance_ids = await get_instance_id("vs_code_asg", clientAS) || [];
    if(instance_ids){
        const valid_ids = instance_ids.filter((id): id is string => id !== undefined);
        const instance_ips = await get_instance_ip(valid_ids, client);
        console.log(instance_ips);

    }




}



get_instance_record()


