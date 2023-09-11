import { Result } from 'antd';


export const NotFound = () => {

    return (
       
        <Result
            icon={<></>}
            style={{width: "100%"}}
            status="404"
            title="404"
            subTitle={"Not Found"}
        />
    );
};