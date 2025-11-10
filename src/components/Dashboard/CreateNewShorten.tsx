import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { data } from 'autoprefixer';
import TextField from '../TextField';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import toast from 'react-hot-toast';
import { useStoreContext } from '../../ContextApi/ContextApi';
import api from '../../Api/Api';

const CreateNewShorten = ({ setOpen, refetch }: { [key: string]: any }) => {
    const { token } = useStoreContext();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            originalLink: "",
        },
        mode: "onTouched",
    });

    const createShortUrlHandler = async (data: any) => {
        setLoading(true);
        try {
            const { data: res } = await api.post("/api/links/shorten", data, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            console.log("SHORT URL TO THE ", res);
            const shortenUrl = `${import.meta.env.VITE_FRONT_END_URL + "/s/" + `${res.shortLink}`}`;
            navigator.clipboard.writeText(shortenUrl).then(() => {
                toast.success("Short URL Copied to Clipboard", {
                    position: "bottom-center",
                    className: "mb-5",
                    duration: 3000,
                });
            });

            await refetch();
            reset();
            setOpen(false);
        } catch (error) {
            toast.error("Create ShortURL Failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=" flex justify-center items-center bg-white rounded-md">
            <form
                onSubmit={handleSubmit(createShortUrlHandler)}
                className="sm:w-[450px] w-[360px] relative  shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
            >

                <h1 className="font-montserrat sm:mt-0 mt-2 mb-5 text-center  sm:text-2xl text-[22px] text-slate-800 ">
                    Create New Shorten Url
                </h1>


                <div>
                    <TextField
                        label="Enter URL"
                        required
                        id="originalLink"
                        placeholder="https://example.com"
                        type="url"
                        message="Url is required"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    className="bg-customRed cursor-pointer font-semibold text-white w-32  bg-custom-gradient  py-2  transition-colors  rounded-md my-3"
                    type="submit"
                >
                    {loading ? "Loading..." : "Create"}
                </button>

                {!loading && (
                    <Tooltip title="Close">
                        <button
                            disabled={loading}
                            onClick={() => setOpen(false)}
                            className=" absolute right-2 top-2  "
                        >
                            <RxCross2 className="text-slate-800 text-3xl cursor-pointer" />
                        </button>
                    </Tooltip>
                )}

            </form>
        </div>
    )
}

export default CreateNewShorten