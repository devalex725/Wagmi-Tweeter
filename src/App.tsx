import AccountInfo from './components/account';
import Connectors from './components/connectors';
import AddTweetPanel from './components/addtweet';
import TweetListPanel from './components/tweetlist';

function App() {
  return (
    <div className='p-8 flex flex-col gap-[24px]'>
      {/* wallet connect */}
      <Connectors />
      <hr />
      <AccountInfo />
      <hr />
      {/* adding new tweet */}
      <AddTweetPanel />
      <hr />
      {/* tweetlist */}
      <TweetListPanel />
    </div>
  )
}

export default App
