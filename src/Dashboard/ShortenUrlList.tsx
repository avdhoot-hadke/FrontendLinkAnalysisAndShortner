import ShortenItem from './ShortenItem'

const ShortenUrlList = ({ data }: { [key: string]: any }) => {
    // console.log(data.length)
    // data.map((item: any) => {
    //     console.log("items ", item.id, { ...item })
    // })
    return (
        <div className='my-6 space-y-4'>
            {/* <p>HELLO</p> */}
            {data.map((item: any) => {
                // console.log("------------", { ...item })
                return <ShortenItem key={item.id} {...item} />
            }
            )}
        </div>
    )
}

export default ShortenUrlList