import {ASG_DETAILS, VM_INSTANCE} from '../types/instancePoolType'

export async function estimate_newVMs(machine_pool: VM_INSTANCE[]) {
    //find used and free machines
    //estimate new machines to add or delete
    const warm_pool = machine_pool.filter(vm => vm.isUsed === false);
    const service_pool = machine_pool.filter(vm => vm.isUsed === true);

    //25% free machines that what is used
    const number_new_machines_req = Math.floor(0.25*service_pool.length - warm_pool.length);
    return number_new_machines_req;

}


export async function add_newVMs(asg_details: ASG_DETAILS, number_new_VM: number) {
    const desired_capacity = asg_details.DesiredCapacity;
    const MaxSize= asg_details.MaxSize;
    
}

export async function createInstance(){
    
}