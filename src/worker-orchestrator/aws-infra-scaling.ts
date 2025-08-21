import { AutoScalingClient, DescribeAccountLimitsCommand } from '@aws-sdk/client-auto-scaling';
import { error } from 'console';
import dotenv from 'dotenv';


dotenv.config()

if(process.env.AWS_ACCESS_KEY == undefined|| process.env.AWS_ACCESS_SECRET == undefined){
    throw error("env not loaded")
}

const input = { 
    region: "us-west-1",
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
}

const client = new AutoScalingClient(input);

async function send_data(){
    const input_param = {};
    const command = new DescribeAccountLimitsCommand(input_param) ;
    const response = await client.send(command);
    console.log(response)

}

send_data()


