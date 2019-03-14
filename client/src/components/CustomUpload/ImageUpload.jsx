import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import {Button} from '@material-ui/core'
import defaultImage from "../../assets/img/default-image.png";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: this.props.imagePreviewUrl || defaultImage
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: defaultImage
    });
    this.refs.fileInput.value = null;
  }
  render() {
    var {
      avatar,
     
    } = this.props;
    return (
      <div className="fileinput text-center">
        <input type="file" onChange={ e => this.props.handleImageChange(e)} ref="fileInput" />
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img src={this.props.imagePreviewUrl} alt="..." width="100%"/>
        </div>
        <div>
          {this.state.file === null ? (
            <Button  onClick={() => this.handleClick()}>
              Select image
            </Button>
          ) : (
            <span>
              <Button  onClick={() => this.handleClick()}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button onClick={() => this.handleRemove()}>
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;
