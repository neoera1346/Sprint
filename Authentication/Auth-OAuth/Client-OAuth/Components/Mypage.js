import React, { Component } from "react";
import axios from 'axios';
const FILL_ME_IN = 'FILL_ME_IN'

class Mypage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],

      // TODO: GitHub API 를 통해서 받아올 수 있는 정보들 중에서
      // 이름, login 아이디, repository 주소, public repository 개수를 포함한 다양한 정보들을 담아주세요.
    }
  }

  async getGitHubUserInfo() {
    // TODO: GitHub API를 통해 사용자 정보를 받아오세요.
    // https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-the-authenticated-user

    // ! 방법 1.
    // await axios({
    //   method: 'GET',
    //   url: 'http://api.github.com/user',
    //   headers: {
    //     authorization: `token ${this.props.accessToken}`
    //   },
    // })
    // .then((res) => res.data)
    // .then((result) => {
    //   this.setState({
    //     name: result.name,
    //     login: result.login,
    //     html_url: result.html_url,
    //     public_repos: result.public_repos,
    //   })
    // })
    // .catch((err) => console.log(err))

    // ! 방법 2.
    // axios.defaults.headers.common['authorization'] = 'token ' + this.props.accessToken;
    // const result = await axios.get('https://api.github.com/user')
    //   .then(res => res.data);
    // // console.log(result);
    // console.log(authorization)
    // if (result) {
    //   this.setState({
    //     name: result.name,
    //     login: result.login,
    //     html_url: result.html_url,
    //     public_repos: result.public_repos
    //   });
    // }
     
    // ! 방법 3.
    const { accessToken } = this.props
    console.log(accessToken)
    let response = await axios.get('https://api.github.com/user', {
      headers: {
        authorization: `token ${accessToken}`,
      }
    })

    const { name, login, html_url, public_repos } = response.data

    this.setState({
      name,
      login,
      html_url,
      public_repos
    })
  }

  async getImages() {
    // TODO : 마찬가지로 액세스 토큰을 이용해 local resource server에서 이미지들을 받아와 주세요.
    // resource 서버에 GET /images 로 요청하세요.

    // ! 방법 1.
    // await axios({
    //   method: "get",
    //   url: "http://localhost:8080/images",
    //   headers: {
    //     authorization: `token ${this.props.accessToken}`,
    //   },
    // })
    //   .then((res) => res.data)
    //   .then((result) => {
    //     this.setState({
    //       images: result.images,
    //     });
    //   })
    //   .catch((err) => console.log(err));

    // ! 방법 2.
    // axios.defaults.headers.common['authorization'] = 'token ' + this.props.accessToken;
    // const result = await axios.get('http://localhost:8080/images')
    //   .then(res => res.data);
    // // console.log(result);
    // if (result.images) {
    //   this.setState({ images: result.images });
    // }

    // ! 방법 3.
    const { accessToken } = this.props
    
    console.log(accessToken)
    let response = await axios.get('http://localhost:8080/images', {
      headers: {
        authorization: `token ${accessToken}`,
      }
    })

    const { images } = response.data

    this.setState({
      images
    })
  }

  componentDidMount() {
    this.getGitHubUserInfo()
    this.getImages()
  }

  render() {
    const { accessToken } = this.props

    if (!accessToken) {
      return <div>로그인이 필요합니다</div>
    }

    const { name, login, html_url, public_repos, images } = this.state;

    return (
      <div>
        <div className='mypageContainer'>
          <h3>Mypage</h3>
          <hr />

          <div>안녕하세요. <span className="name" id="name">{name}</span>님! GitHub 로그인이 완료되었습니다.</div>
          <div>
            <div className="item">
              나의 로그인 아이디:
              <span id="login">{login}</span>
            </div>
            <div className="item">
              나의 GitHub 주소:
              <span id="html_url">{html_url}</span>
            </div>
            <div className="item">
              나의 public 레포지토리 개수:
              <span id="public_repos">{public_repos}</span>개
            </div>
          </div>

          <div id="images">
            {
              /* TODO: 여기에 img 태그를 이용해 resource server로 부터 받은 이미지를 출력하세요 */
              images.map(img => <img key={img.file} src={img.blob}/>)
              }
          </div>
        </div>
      </div>
    );
  }

}

export default Mypage;
