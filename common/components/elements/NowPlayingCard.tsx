import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { BsSpotify as SpotifyIcon } from 'react-icons/bs';
import { MdClose as CloseIcon } from 'react-icons/md';
import useSWR from 'swr';

import { NowPlayingProps } from '@/common/types/spotify';
import { fetcher } from '@/services/fetcher';

import AnimatedBars from './AnimatedBars';

const NowPlayingCard = ({ isExpand = false }: { isExpand?: boolean }) => {
    const { data } = useSWR<NowPlayingProps>('/api/spotify/now-playing', fetcher);

    const [expand, setExpand] = useState(isExpand);

    const trimmedSongTitle =
        data?.title &&
        data?.title.slice(0, 40) + (data?.title?.length > 40 ? '...' : '');

    const trimmedSongArtist =
        data?.artist &&
        data?.artist.slice(0, 20) + (data?.artist?.length > 20 ? '...' : '');

    const handleOpenSongUrl = (url?: string) => {
        url && window.open(url, '_blank');
    };

    const handleMusicToggle = () => setExpand(!expand);

    if (!data?.songUrl) return null;

    return (
        <>
            {expand && (
                <div
                    className="fixed inset-0 z-10 bg-transparent"
                    onClick={handleMusicToggle}
                />
            )}
            <div
                className={clsx(
                    'fixed',
                    expand ? 'bottom-0 left-0 right-0 p-3 z-10' : 'bottom-6 left-6 z-10',
                    !expand && 'flex justify-start',
                )}
            >
                {!expand ? (
                    <div
                        className='cursor-pointer rounded-full bg-neutral-950 transition-all duration-100'
                        onClick={handleMusicToggle}
                    >
                        <SpotifyIcon size={44} className='animate-pulse text-green-500' />
                    </div>
                ) : (
                    <div
                        className='flex items-center gap-3 rounded-md bg-green-400 px-3 py-2 text-neutral-800 dark:bg-green-500 dark:text-neutral-900'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {data?.albumImageUrl && (
                            <Image
                                className='rounded-md'
                                unoptimized
                                alt={data?.album}
                                src={data?.albumImageUrl}
                                width={60}
                                height={60}
                            />
                        )}
                        <div
                            className='flex flex-col pt-0.5 hover:cursor-pointer hover:underline'
                            onClick={() => handleOpenSongUrl(data?.songUrl)}
                        >
                            <div className='text-sm font-medium'>{trimmedSongTitle}</div>
                            <div className='flex items-center gap-2 text-xs'>
                                <AnimatedBars />
                                <span className='pt-1 text-[14px] text-neutral-800'>
                                    {trimmedSongArtist}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default NowPlayingCard;