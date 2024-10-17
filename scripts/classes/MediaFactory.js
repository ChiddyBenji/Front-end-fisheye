// eslint-disable-next-line no-unused-vars
class MediaFactory {
    createMedia(mediaData, index) {
        if (mediaData.image) {
            // eslint-disable-next-line no-undef
            return new ImageMedia(mediaData, index);
        } else if (mediaData.video) {
            // eslint-disable-next-line no-undef
            return new VideoMedia(mediaData, index);
        } else {
            throw new Error("Unknown media type");
        }
    }
}
