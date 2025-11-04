import ShortenItem from './ShortenItem'

const ShortenUrlList = ({ data }: { [key: string]: any }) => {
    return (
        <div className='my-6 space-y-4'>
            {data.map((item: any) => (
                <ShortenItem key={item.id} {...item} />
            ))}
        </div>
    )
}

export default ShortenUrlList