import Image from 'next/image';

const Logo = () => {

    const appName = process.env.NEXT_PUBLIC_APP_NAME as string;

    return (
        <div className='flex items-center gap-2'>
            <Image
                src={'/logo.png'}
                alt='logo'
                width={40} height={40}
            />
            <h2 className='font-bold text-xl'>
                {appName}
            </h2>
        </div>
    );
};

export default Logo;