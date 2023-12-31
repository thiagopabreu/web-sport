import { MoveToStartIcon, StarIcon, CgFacebook } from "@primer/octicons-react"
import { Col } from "react-bootstrap"
import { MainNews } from "../MainNews/mainNews"


export const Main = (props) => {

    return (
        <>
            <Col xs={12} md={{span: 8, offset: 2}} style={{marginTop: '3rem'}} >
                <div style={{display: 'flex', alignContent: 'center', alignItems: 'center', justifyItems: 'center'}}>
                    <StarIcon size={30} fill="#D60007"/>
                    <p style={{marginBottom: 0, color: '#213249', fontSize: '2rem', fontWeight: 400, lineHeight: 'normal', marginLeft: 10}}>Destaques</p>
                </div>
            </Col>
            <Col xs={12} md={{span: 8, offset: 2}} style={{marginTop: '3rem'}}>
                <MainNews />
            </Col>
        </>
    )
}