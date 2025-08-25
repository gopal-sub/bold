import { AutoScalingClient, DescribeAccountLimitsCommand, DescribeLoadBalancersCommand,DescribeAutoScalingGroupsCommand} from '@aws-sdk/client-auto-scaling';
import { error } from 'console';
import dotenv from 'dotenv';


dotenv.config()

if(process.env.AWS_ACCESS_KEY == undefined|| process.env.AWS_ACCESS_SECRET == undefined){
    throw error("env not loaded")
}

const input = { 
    region: "us-east-1",
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
}

const client = new AutoScalingClient(input);

async function send_data(){
    // const input_param = {};
    // const command = new DescribeAccountLimitsCommand(input_param) ;
    // const response = await client.send(command);
    // console.log(response)
    // const input = { // DescribeLoadBalancersRequest
    //     AutoScalingGroupName: ["vs_code_asg"],
    // };
    const input = { // AutoScalingGroupNamesType
        AutoScalingGroupNames: [ // AutoScalingGroupNames
            "vs_code_asg",
        ],
        IncludeInstances: true,
        MaxRecords: 10,
    };
        const command = new DescribeAutoScalingGroupsCommand(input);
    const response = await client.send(command);
    // @ts-ignore
    console.log(response.AutoScalingGroups[0]?.Instances)

}



send_data()


