import { AutoScalingClient, DescribeAccountLimitsCommand, DescribeAutoScalingInstancesCommand ,DescribeLoadBalancersCommand,DescribeAutoScalingGroupsCommand} from '@aws-sdk/client-auto-scaling';
import { error } from 'console';
import dotenv from 'dotenv';
import { EC2Client } from "@aws-sdk/client-ec2";
import {get_instance_ip, get_instance_id, create_new_instance} from './services/instanceService'
import {autoscaling_grp_details, update_asg_desiredInstances} from './services/autoscaling_groupServices'


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

    // const asg_details = await autoscaling_grp_details("vs_code_asg", clientAS);
    // // await update_asg_desiredInstances("vs_code_asg", 5, clientAS);

    // return asg_details;

    await create_new_instance(client)
}




async function getIP_Instances() {

    const instance_ids = await get_instance_id("vs_code_asg", clientAS);
    if(instance_ids){
        const valid_ids = instance_ids.filter((id): id is string => id !== undefined);
        const instance_ips = await get_instance_ip(valid_ids, client);
    }
    
}






get_instance_record()


