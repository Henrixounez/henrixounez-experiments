import { css } from '@emotion/css'
import tw from '@tailwindcssinjs/macro'
import Layout from '../../components/layout'
import Hypocycloid from './hypocycloid'
import Hypotrochoid from './hypotrochoid'

const Geometry = ({data}) => (
    <Layout title='Geometry' showPage description='Geometry visualisations'>
        <div className={css(tw`flex flex-col`)}>
            <Hypocycloid />
            <Hypotrochoid />
        </div>
    </Layout>
);

export default Geometry;