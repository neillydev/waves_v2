import React from 'react';

import SoundSVG from '../../../public/sound.svg';

import styles from '../../styles/Post/Post.module.css';

type PostProps = {
    profileImg: string;
    username: string;
    name: string;
    mediaSrc: string;
    caption: string;
    soundCaption: string;
    soundSrc: string;
};

const Post = ({ profileImg, username, name, mediaSrc, caption, soundCaption, soundSrc }: PostProps) => {
    return (
        <div className={styles.postContainer}>
            <div className={styles.postWrapper}>
                <div className={styles.postProfile}>
                    <img src={profileImg} />
                </div>
                <div className={styles.post}>
                    <div className={styles.postProfileContainer}>
                        <div className={styles.profileMeta}>
                            <div className={styles.profileUsername}>
                                {username}
                            </div>
                            <div className={styles.profileName}>
                                {name}
                            </div>
                        </div>
                        <div className={styles.followContainer}>
                            <button className={styles.followBtn}>Follow</button>
                        </div>
                    </div>
                    <div className={styles.postMedia}>
                        <div className={styles.postMediaVideoContainer}>
                            <video src={mediaSrc} />
                        </div>
                    </div>
                    <div className={styles.postCaption}>
                        <h2 className={styles.caption}>{
                            caption.includes('#') ? 
                            caption.split(' ').map((word) => word.includes('#') ? <><span className={styles.hashtag}>{`${word}`}</span><span className={styles.hashtagSpace}></span></> : `${word} `)
                            : 
                            caption
                        }</h2>
                    </div>
                    <div className={styles.postSound}>
                        <SoundSVG /><h4 className={styles.soundCaption}>original sound - {soundCaption}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Post;