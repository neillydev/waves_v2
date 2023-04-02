import React from 'react';
import ContainerBlock from '@/components/ContainerBlock/ContainerBlock';

import styles from '../../styles/Upload/Upload.module.css';

const Upload = () => {
    return (
        <div className={styles.mainUpload}>
            <ContainerBlock>
                <div className={styles.uploadContainer}>
                    <div className={styles.uploadWrapper}>
                        <div className={styles.uploadTitleContainer}>
                            <h1>Upload post</h1>
                            <h2>Post content to your account</h2>
                        </div>
                        <div className={styles.uploadBodyContainer}>
                            <div className={styles.uploadMeta}>
                                <div className={styles.uploadCaption}>
                                    <h3>Caption</h3>
                                    <input type="text" />
                                </div>
                                <div className={styles.uploadAccessControls}>
                                    <h3>Post visible to</h3>
                                    <select>
                                        <option>Public</option>
                                        <option>Follows</option>
                                        <option>Unlisted</option>
                                    </select>
                                </div>
                                <div className={styles.uploadAllowanceControls}>
                                    <h3>Users can:</h3>
                                    <div className={styles.uploadCheckbox}>
                                        <input type="checkbox" id="comment" name="comment" />
                                        <label htmlFor="comment">Comment</label>
                                    </div>
                                </div>
                                <div className={styles.uploadSubmitControls}>
                                    <button>Delete</button>
                                    <button>Post</button>
                                </div>
                            </div>
                            <div className={styles.uploadPreviewWrapper}>

                            </div>
                        </div>
                    </div>
                </div>
            </ContainerBlock>
        </div>
    )
}

export default Upload