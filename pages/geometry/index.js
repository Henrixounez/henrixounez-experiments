import xw from 'xwind';
import Layout from '../../components/layout';
import Hypocycloid from './hypocycloid';
import Hypotrochoid from './hypotrochoid';

const Geometry = ({data}) => (
    <Layout title='Geometry' showPage description='Geometry visualisations'>
        <div css={xw`flex flex-col`}>
            <Hypocycloid />
            <Hypotrochoid />
        </div>
    </Layout>
);

export default Geometry;