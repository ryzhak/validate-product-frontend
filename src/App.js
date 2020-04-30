import React from 'react';
import Swal from 'sweetalert2';
import './App.css';
import api from './api';

/**
 * Landing page
 */
class App extends React.Component {
  // available actions
  ACTION_PAGE_VISIT = 'ACTION_PAGE_VISIT';
  ACTION_CLICK_STORE_GOOGLE = 'ACTION_CLICK_STORE_GOOGLE';
  ACTION_CLICK_STORE_APPLE = 'ACTION_CLICK_STORE_APPLE';

  /**
   * On component mount
   */
  componentDidMount() {
    api.createAction(this.ACTION_PAGE_VISIT).catch(err => console.error(err));
  }

  /**
   * On store button click
   * @param {string} storeName ap store name, can be "google" or "apple"
   */
  onStoreBtnClick = async (storeName) => {
    // save click action on the server side
    api.createAction(storeName === 'google' ? this.ACTION_CLICK_STORE_GOOGLE : this.ACTION_CLICK_STORE_APPLE).catch(err => console.error(err));
    // open email popup
    const { value: email } = await Swal.fire({
      title: 'Subscribe and get a 50% discount!',
      text: 'We are in active development, we will get in touch soon.',
      input: 'email',
      inputPlaceholder: 'Enter your email address',
      confirmButtonText: 'Subscribe',
      confirmButtonColor: '#2ecc71'
    })
    if (email) {
      // save email on the server side
      api.signup(email).catch(err => console.error(err));
      // show "thank you" popup if user subscribed
      Swal.fire({
        icon: 'success',
        title: `Thank you ${email}`,
        text: 'You are getting a 50% discount! We will contact you soon.'
      })
    }
  };

  /**
   * Renders JSX template
   * @return {Object} JSX template
   */
  render() {
    return (
      <div className="container-fluid">
        {/* logo */}
        <div className="row mt-3 logo">
          <div className="col-12 col-md-2 col-lg-1">
            <img src="/assets/logo.png" className="img-fluid logo__image" alt="logo" />
          </div>
        </div>
        {/* main content */}
        <div className="row mt-5">
          {/* screenshots */}
          <div className="col-md-6 screenshots">
            <div className="row">
              <div className="col-md-4 col-lg-3 offset-lg-3 screenshots__container-1">
                <img src="/assets/screenshot_with_phone_1.png" className="img-fluid" alt="screenshot_1" />
              </div>
              <div className="col-md-4 col-lg-3 screenshots__container-2">
                <img src="/assets/screenshot_with_phone_2.png" className="img-fluid" alt="screenshot_2" />
              </div>
              <div className="col-md-4 col-lg-3 screenshots__container-3">
                <img src="/assets/screenshot_with_phone_3.png" className="img-fluid" alt="screenshot_3" />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5">
            {/* app description */}
            <div className="row app-desc">
              <div className="col-md-12 col-lg-10 offset-lg-2">
                <div className="app-desc__title">My App</div>
                <div className="app-desc__subtitle">My App slogan</div>
                <div className="app-desc__subtitle">Only 19.99$ per month</div>
                <ul className="mt-3">
                  <li className="app-desc__feature">Feature 1</li>
                  <li className="app-desc__feature">Feature 2</li>
                  <li className="app-desc__feature">Feature 3</li>
                  <li className="app-desc__feature">Feature 4</li>
                  <li className="app-desc__feature">Feature 5</li>
                </ul>
              </div>
            </div>
            {/* store buttons */}
            <div className="row mt-2 store">
              <div className="col-md-6 col-lg-5 offset-lg-1 col-xl-4 offset-xl-1 mt-2 store__btn" onClick={() => this.onStoreBtnClick('google')}>
                <img src="/assets/button_google_play.png" className="img-fluid" alt="Download from Google Play" />
              </div>
              <div className="col-md-6 col-lg-5 col-xl-4 mt-2 store__btn" onClick={() => this.onStoreBtnClick('apple')}>
                <img src="/assets/button_app_store.png" className="img-fluid" alt="Download from App Store" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
