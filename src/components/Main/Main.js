import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCards: [],
      searchText: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences"
      )
      .then((res) => {
        this.setState({
          allCards: [
            ...this.state.allCards,
            ...res.data.free,
            ...res.data.paid,
          ],
        });
      });
  }
  getListOfCity = () => {
    const city = [];

    this.state.allCards.map((a) => {
      if (!city.includes(a.city)) {
        city.push(a.city);
      }
    });
    const item = city.map((a) => {
      return (
        <div
          id="collapseOne"
          class="collapse hide"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <button className="btn" onClick={this.handleCityClick} value={a}>{a}</button>
        </div>
      );
    });
    return item;
  };
  handleCityClick = (e) => {
    const {  allCards } = this.state;
    console.log(e)
    this.setState({
      allCards: allCards.filter((card) => {
        if ( card.city == e.target.value) {
          return card;
        }
      }),
    });
  };
  getListOfCountry = () => {
    const country = [];

    this.state.allCards.map((a) => {
      if (!country.includes(a.country)) {
        country.push(a.country);
      }
    });
    const item = country.map((a) => {
      return (
        <div
          id="collapseFour"
          class="collapse hide"
          aria-labelledby="headingFour"
          data-parent="#accordionExample"
        >
          <div className="btn" onClick={this.handleCountryClick} value={a}>{a}</div>
        </div>
      );
    });
    return item;
  };
  handleCountryClick = (e) => {
    const {  allCards } = this.state;
    console.log(e)
    this.setState({
      allCards: allCards.filter((card) => {
        if ( card.country == e.target.value) {
          return card;
        }
      }),
    });
  };

  handleTypeClick = (e) => {
    const {  allCards } = this.state;
    this.setState({
      allCards: allCards.filter((card) => {
        if ( card.entryType == e.target.value) {
          return card;
        }
      }),
    });
  };
//   onMonthClick= (e) => {
//     const {  allCards } = this.state;
//     this.setState({
//       allCards: allCards.filter((card) => {
//         if ( card. == e.target.value) {
//           return card;
//         }
//       }),
//     });
//   };
  handleSearchChange = (e) => {
    let val = e.target.value;
    this.setState({
      searchText: val,
    });
  };

  handleSeachClick = () => {
    const { searchText, allCards } = this.state;
    this.setState({
      allCards: allCards.filter((card) => {
        if (card.confName === searchText || card.city == searchText) {
          return card;
        }
      }),
    });
  };

 

  handleClearClick = () => {
    axios
      .get(
        "https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences"
      )
      .then((res) => {
        this.setState({
          allCards: [
            ...this.state.allCards,
            ...res.data.free,
            ...res.data.paid,
          ],
          searchText: "",
        });
      });
  };
  confCard = (ele) => {
    const cards = this.state.allCards ? this.state.allCards : [];
    if (Array.isArray(cards)) {
      const card = cards.map((ele) => {
        return (
          <div className="m-2">
            <div className="col-lg-4 col-sm-12">
              <Card data={ele} />
            </div>
          </div>
        );
      });

      return card;
    } else {
      return <div className="col-lg-4 col-sm-12">{cards}</div>;
    }
  };
  render() {
    const Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div className="m-5">
          <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <a class="navbar-brand text-primary" href="#">Conferences</a>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
     
    </ul>
    <form class="form-inline my-2 my-lg-0">
   <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearchChange}
                  value={this.state.searchText}/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSeachClick}>Search</button>
      <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={this.handleClearClick}>Clear</button>
    </form>
  </div>
</nav>
          </div>
        <div className="row">
          <div className="col-2">
            <div class="accordion" id="accordionExample">
              <div class="card ">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <div
                      class="btn "
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      City
                    </div>
                  </h5>
                </div>

                {this.getListOfCity()}
              </div>

              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <div
                      class="btn "
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      Month
                    </div>
                  </h5>
                </div>
                {Months.map((a) => {
                  return (
                    <div
                      id="collapseTwo"
                      class="collapse hide"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div className="btn" value={a}>{a}</div>
                    </div>
                  );
                })}
              </div>

              <div class="card">
                <div class="card-header" id="headingThree">
                  <h5 class="mb-0">
                    <div
                      class="btn "
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    
                    >
                      Type
                    </div>
                  </h5>
                </div>

                <div
                  id="collapseThree"
                  class="collapse hide"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                  
                >
                  <div className="btn" onClick={this.handleTypeClick} value="Free">Free</div>
                </div>
                <div
                  id="collapseThree"
                  class="collapse hide"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                  
                >
                  <div className="btn" onClick={this.handleTypeClick} value="Paid">paid</div>
                </div>
              </div>

              <div class="card">
                <div class="card-header" id="headingFour">
                  <h5 class="mb-0">
                    <div
                      class="btn "
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      Country
                    </div>
                  </h5>
                </div>

               {this.getListOfCountry()}
              </div>
            </div>
          </div>
          <div className="col-10">
            
            <div className="row">{this.confCard()}</div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {};

export default Main;
