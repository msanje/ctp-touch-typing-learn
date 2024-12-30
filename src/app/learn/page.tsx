import Keyboard from '@/components/Keyboard'
import KeyboardTest from '@/components/KeyboardTest'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return <div>
        <Keyboard />
        {/* <KeyboardTest /> */}
    </div>
}

export default page