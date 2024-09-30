import Header from "../Header";
const MainLayout = ({ children }:{ children: React.ReactNode }) => {
    return (
        <div className='global-layout'>
            <Header/>
            <main>{children}</main>
        </div>
    );
};

export default MainLayout;
