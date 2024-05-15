import YouTube from 'react-youtube';

interface VideoCardProps {
    videoId: string;
    height: string;
    width: string;
  }
  
const VideoCard: React.FC<VideoCardProps> = ({ videoId, height, width }) => {
  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} className='youtube-iframe' />;
};

export default VideoCard;
