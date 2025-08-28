
import { AutoScalingClient, SetDesiredCapacityCommand, DescribeAutoScalingGroupsCommand} from '@aws-sdk/client-auto-scaling';




export async function autoscaling_grp_details(asg_name: string, client: AutoScalingClient) {
    const input = { // AutoScalingGroupNamesType
        AutoScalingGroupNames: [ // AutoScalingGroupNames
            asg_name,
        ],
        IncludeInstances: true,
    };
    try {
        const command = new DescribeAutoScalingGroupsCommand(input);
        const response = await client.send(command);
        const asg = response.AutoScalingGroups?.[0];
        if (!asg) {
            throw new Error("No Auto Scaling Groups found in response");
        }
        
        const asg_details = {
            MinSize: asg.MinSize,
            MaxSize: asg.MaxSize,
            DesiredCapacity: asg.DesiredCapacity
        }
        return asg_details;
        
    } catch (error) {
        return null
    }

   
}

export async function update_asg_desiredInstances(ags_name:string, DesiredCapacity:number, client: AutoScalingClient) {

    const input = { // SetDesiredCapacityType
        AutoScalingGroupName: ags_name, // required
        DesiredCapacity: DesiredCapacity, // required
    };
    const command = new SetDesiredCapacityCommand(input);
    const response = await client.send(command);
}

