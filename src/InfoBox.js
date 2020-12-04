import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css';

function InfoBox({title,cases,total,...props}) {
    return (
        <Card onClick={props.onClick} className="infoBox">
            <CardContent>
                <Typography className="infoBoxTitle" color="textSecondary">{title}</Typography>
                <h2 className="infoBoxCases">{cases}</h2>
               
                
                <Typography className="infoBoxTotal" color="textSecondary"> {total} Total </Typography>

                
            </CardContent>
        </Card>
    )
}

export default InfoBox
