import css from './Loader.module.css';
import { Grid } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <Grid height={100} width={100} color="#3f51b5" visible={true} />
    </div>
  );
};
