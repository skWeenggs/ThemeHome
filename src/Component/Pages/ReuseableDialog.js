import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';

const ReusableDialog = ({ open, onClose, onSubmit, theme }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleCancel = () => {
        onClose();
    };
    
    return (
        <dialog
            open={open}
            onClose={handleCancel}
            className={`lg:w-[60%] rounded-md ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                }`}
        >
            <p
                className="text-2xl border-2 rounded-full hover:border-gray-800 cursor-pointer w-fit"
                onClick={handleCancel}
            >
                <AiFillCloseCircle />
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="py-4 px-0 ">
                    <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0 ">
                        <div class="my-3 sm:my-0  w-full lg:w-1/2 px-2 ">
                            <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                                Content Page Name
                            </label>
                            <input class={` appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500 ' : 'text-gray-900 bg-gray-100'}`} id="contents" placeholder="Page Name" type="text" {...register('content', { required: true })} />
                            {errors.content && <p className='text-red-500 '>Notion contents fill the content name</p>}
                        </div>

                        <div class="my-3 sm:my-0  w-full lg:w-1/2  px-2 ">
                            <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                                Slug Url
                            </label>
                            <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder='Slug page url' id="slug" type="text" {...register('slug', { required: true })} />
                            {errors.slug && <p className='text-red-500'>Notion contents slug url is required.</p>}
                        </div>
                    </div>
                    <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">
                        {/* <div class="my-3 sm:my-0 w-full lg:w-1/2 px-2">
                            <label
                                class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                            >
                                Ready to Publish
                            </label>
                            <select
                                class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                                    }`}
                                id="ready"
                                {...register('ready', { required: true })}
                            >
                                <option value="">Select status</option>
                                <option value="pending">Pending</option>
                                <option value="done">Done</option>
                            </select>
                            {errors.ready && (
                                <p className="text-red-500">Notion contents ready to publish required.</p>
                            )}
                        </div> */}
                        <div class="my-3 sm:my-0 w-full lg:w-1/2 px-2">
                            <label
                                class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                            >
                                Publish Date
                            </label>
                            <input
                                class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                                    }`}
                                type="date"
                                id="date"
                                {...register('date', { required: true })}
                            />
                            {errors.date && (
                                <p className="text-red-500">Notion pages page-id required.</p>
                            )}
                        </div>
                        <div class="my-3 sm:my-0 w-full flex items-center lg:w-1/2 px-2">
                            <label
                                class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                            >
                                Featured
                            </label>
                            <input
                                // class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${
                                //   theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                                // }`}
                                type="checkbox"
                                id="feature"
                                {...register('feature', { required: true })}
                            />
                            {/* {errors.author_page_id && (
                          <p className="text-red-500">Notion author page-id required.</p>
                        )} */}
                        </div>
                    </div>
                    <div class="flex p-0 sm:p-2 flex-wrap justify-start space-y-0">
                        <div class="my-3 sm:my-0  w-full lg:w-1/2   px-2">
                            <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                                Excerpt
                            </label>
                            <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder='enter some details of excerpt' id="excerpt" {...register('excerpt', { required: true })} />
                            {errors.excerpt && <p className='text-red-500'>Notion contents enter some details excerpt required.</p>}
                        </div>
                    </div>

                    <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">

                        <div class="flex mx-auto justify-center lg:w-1/5 py-5">
                            <button
                                class={` lg:w-full  font-bold py-3 px-4 rounded-md ${theme === 'dark' ? 'text-white bg-red-400 hover:bg-red-500 focus:outline-gray-200 ' : 'text-gray-500 bg-red-400 hover:bg-red-500'}`}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                        <div class="flex mx-auto justify-center lg:w-1/5 py-5">
                            <button
                                class={`lg:w-full  font-bold py-3 px-4 rounded-md ${theme === 'dark' ? 'text-white bg-green-400 hover:bg-green-500 focus:outline-gray-200 ' : 'text-gray-500 bg-green-400 hover:bg-green-500'}`}
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </dialog>
    );
}
export default ReusableDialog;