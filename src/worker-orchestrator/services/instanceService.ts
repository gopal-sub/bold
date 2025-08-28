import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { AutoScalingClient, DescribeAutoScalingGroupsCommand } from '@aws-sdk/client-auto-scaling';




export async function get_instance_ip(instance_ids: string[], client: EC2Client) {
    const input = { // DescribeAutoScalingInstancesType
        InstanceIds: instance_ids
    };
    try{
        const command = new DescribeInstancesCommand(input);
        const response = await client.send(command);
        //@ts-ignore
        const instance_ips = response.Reservations[0]?.Instances?.map(obj => obj.PublicIpAddress);
        return instance_ips
    }catch(e){
        return null;

    }
    
}


export async function get_instance_id(autoscaling_grp: string, client: AutoScalingClient) {
    const input = { // AutoScalingGroupNamesType
        AutoScalingGroupNames: [ // AutoScalingGroupNames
            autoscaling_grp,
        ],
        IncludeInstances: true,
        MaxRecords: 10,
    };
    try {
        const command = new DescribeAutoScalingGroupsCommand(input);
        const response = await client.send(command);
        // @ts-ignore
        const instance_ids = response.AutoScalingGroups[0]?.Instances?.map(obj => obj.InstanceId);
        return instance_ids;
    } catch (error) {
        return null
    }

    
}