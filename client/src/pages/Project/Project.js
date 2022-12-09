import React from 'react';
import Container from '../../components/UI/Container'
import NavBar from '../../components/NavBar/NavBar';
import Content from '../../components/UI/Content';
import SideBar from '../../components/UI/SideBar';
import Main from '../../components/UI/Main';

 
const Project = () => {
    return (
        <Container>
            <NavBar />
            <Content>
                <SideBar>
                    
                </SideBar>
                <Main>
                    Project view
                </Main>
            </Content>
            
        </Container>
    );
};

export default Project;