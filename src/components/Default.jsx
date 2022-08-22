import React, {Component} from 'react';

class Default extends Component {
    render(){
        console.log(this.props);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1 className="display-3"><span className="text-danger" >404</span></h1>
                        <h1>error</h1>
                        <h2>page not found</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default Default;