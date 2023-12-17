// pages/index.tsx
import SurveyForm from './SurveyForm';

const Home: React.FC = () => {
  return (
    <div style={{
      minWidth: '300px',
      margin: '80px auto',
      width: 'fit-content',
      height: 'fit-content',
      padding: 10,
      border: '1px solid #0000001c',
      borderRadius: 5,
      boxShadow: '0px 0px 5px #dddddd'
    }}>
      <h1 style={{ width: 'fit-content', margin: '20px auto' }}>アンケートフォーム</h1>
      <SurveyForm />
    </div>
  );
};

export default Home;
