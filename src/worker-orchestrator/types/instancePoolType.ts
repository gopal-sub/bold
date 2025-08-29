export type warmPool = {
    instanceIP: string,
    projectID: string,
    isUsed: boolean,
}

export type asg_details = {
    MinSize: number,
    MaxSize: number,
    DesiredCapacity: number,

}