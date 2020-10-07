import React from "react";
import {
  Card,
  CardHeader,
  CardBody
} from "shards-react";
import {getUsersServerB} from "../../utils/api"
import img from './autor.jpg'

let dataB = [];

class NotasB extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { seconds: 0 , data: dataB, img: img};
    this.canvasRef = React.createRef();
  }

  async tick() {
    let responseB = await getUsersServerB();
    this.setState({
      data: responseB['result']
    })
  }  
  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 1000);
  }
  
  render() {
    return this.state.data.map((nota) => {
      return <div><br></br> <Card small className="blog-comments">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{nota.autor}</h6>
        </CardHeader>
    
        <CardBody className="p-0">
          <div className="blog-comments__item d-flex p-3">
            {/* Avatar */}
            <div className="blog-comments__avatar mr-3">
              <img src={this.state.img}  alt="hola"/>
            </div>
              {/* Content */}
            <div className="blog-comments__content">
              {/* Content :: Body */}
              <p className="m-0 my-1 mb-2 text-muted">{nota.nota}</p>
            </div>
          </div>
        </CardBody>
      </Card><br></br></div>
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}
export default NotasB;
