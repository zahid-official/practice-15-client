

const AddTasks = () => {
    
const handleTaskModal = () => {
    document.getElementById("my_modal_1").showModal()
}

    return (
        <div className=''>
            <button onClick={handleTaskModal} className='btn text-xl font-bold bg-[#005f73] hover:bg-[#103c44] text-white border-none px-6'>Add Task +</button>
        </div>
    );
};

export default AddTasks;