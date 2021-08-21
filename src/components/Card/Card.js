import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // console.log(this.props.data)
        const{data}=this.props;
        return (
            <div>
                <div class="card" style={{width: "18rem",height:"450px"}}>
                    <img class="card-img-top" src={data.imageURL} alt="Card image cap" style={{minHeight:"230px",maxHeight:"230px"}}/>
                    <div class="card-body">
                        <h5 class="card-title text-truncate" data-toggle="tooltip" data-placement="top" title={data.confName}>{data.confName}</h5>
                        <p class="card-text text-primary">{data.confStartDate}</p>
                        <p class="card-text text-danger">{data.entryType}</p>
                        <a href="#" class="btn btn-primary text-truncate" style={{maxWidth:"100%",minWidth:"100%",maxHeight:"50px"}}>{data.confUrl}</a>
                    </div>
                </div>
                
            </div>
        );
    }
}

Card.propTypes = {};

export default Card;
