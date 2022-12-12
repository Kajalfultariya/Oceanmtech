//Navbar.js
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-scroll';
import mobile2 from "../Image/phone-otp.svg"
import refer from "../Image/refer.svg"
import pin from "../Image/enter-pin.svg"
import lock from "../Image/lock.svg"
import lock2 from "../Image/lock-2.svg"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import UseSignIn from './UseSignIn';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useHistory } from 'react-router';



const Navbar = ({ navClass, linkClassName }) => (
  <NavComponent navClass={navClass}
    linkClassName={linkClassName}
  />
);

export const NavComponent = ({ onClick, navClass, linkClassName }) => {

  const history = useHistory();

  const {
    number,
    setNumber,
    verifyError,
    setVerifyError,
    apiError,
    setApiError,
    apiError1,
    setApiError1,
    HandleSendOtp,
    setCode1,
    setCode2,
    setCode3,
    setCode4,
    setCode5,
    setCode6,
    flag,
    setFlag,
    handleVerify,
  } = UseSignIn();

  const STATUS = {
    STARTED: "Started",
    STOPPED: "Stopped",
  };

  const INITIAL_COUNT = 120;
  const [error, setError] = React.useState("");
  //   resend useState
  const [secondsRemaining, setSecondsRemaining] = React.useState(INITIAL_COUNT);
  const [status, setStatus] = React.useState(STATUS.STOPPED);

  //   time
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

useEffect(()=>{
console.log("wait flead",flag)
},[flag])

  //   handle Resend Function
  const handleResend = () => {
    setStatus(STATUS.STARTED);
    setSecondsRemaining(120);
    HandleOtp1SetOpen();
    setApiError1("")
    document.getElementById("one").value = "";
    document.getElementById("two").value = "";
    document.getElementById("three").value = "";
    document.getElementById("four").value = "";
    document.getElementById("five").value = "";
    document.getElementById("six").value = "";
    document.getElementById("one").focus();
  };
  //   useinterval
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  const handleFocus = (e) => {
    setVerifyError("")
    setApiError1("")
    //validation start
    const reg = /^[0-9\b]+$/
    let preval = e.target.value
    if (e.target.value === '' || reg.test(e.target.value)) {
      setError("  ")
    }
    else {
      e.target.value = preval.substring(0, (preval.length - 1))
      setError("Please Enter Only Number")
    }
    //validation end
    if (e.target.value) {
      if (e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    }
  };



  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [HandleOtp1Open, setHandleOtp1Open] = React.useState(false);
  const HandleOtp1SetOpen = () => {
    console.log("number,length", number, number?.length)
    if (number && number?.length === 10) {
      HandleSendOtp(number);
      handleClose()
      setHandleOtp1Open(true);
      setStatus(STATUS.STARTED);
    }
    // when not number given
    else if (number?.length === 0) {
      setError("Please Enter Your Mobile Number");
      document.getElementById("mobileinput").focus();
    }
    // when value is higher or lower
    else {
      setError("Please Enter Your Correct Number");
      document.getElementById("mobileinput").focus();
    }

  }
  const HandleOtp1SetClose = () => {
    setHandleOtp1Open(false);
  };


  const [HandleOtp2Open, setHandleOtp2Open] = React.useState(false);
  const HandleOtp2SetOpen = () => {
    setHandleOtp2Open(true);
  }
  const HandleOtp2SetClose = () => {
    setHandleOtp2Open(false);
  };

  const [HandlePin1Open, setHandlePin1Open] = React.useState(false);
  const HandlePin1SetOpen = () => {
    setHandlePin1Open(true);
  }
  const HandlePin1SetClose = () => {
    setHandlePin1Open(false);
  };


  const [HandlePin2Open, setHandlePin2Open] = React.useState(false);
  const HandlePin2SetOpen = () => {
    setHandlePin2Open(true);
  }
  const HandlePin2SetClose = () => {
    setHandlePin2Open(false);
  };

  const [HandleFPinOpen, setHandleFPinOpen] = React.useState(false);
  const HandleFPinSetOpen = () => {
    setHandleFPinOpen(true);
  }
  const HandleFPinSetClose = () => {
    setHandleFPinOpen(false);
  };

  const [BOpen, BsetOpen] = React.useState(false);
  const BackOpen = () => {
    BsetOpen(true);
  }
  const BackClose = () => {
    BsetOpen(false);
  };

  return (
    <nav className={navClass}>

      <Link to="Daily"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        Daily
      </Link>

      <Link to="Festival"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        Festivals
      </Link>
      <Link to="Days"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        Days
      </Link>
      <Link to="Business Category"
        smooth={true}
        className={linkClassName}
        onClick={onClick}
      >
        Business Categories
      </Link>

      <Button variant='contained' onClick={handleClickOpen} >
        Sign Up | Login
      </Button>

      <Dialog open={open} onClose={handleClose}
      >
        <div className="login-modal">
          <h2>Login/Sign Up</h2>
          <div className="modal-fm">
            <div className="mf-group">
              <label>Mobile Number</label>
              <div className="mf-field phone-no">
                <Input
                  variant="outlined"
                  name="Batch"
                  id="mobileinput"
                  type="text"
                  autoFocus
                  value={number || ""}
                  onChange={(e) => {
                    setNumber(e.target.value)
                    setApiError("")
                    setError("")
                  }
                  }
                  className="form-control w-75"
                  placeholder="Enter Your Mobile Number"
                  startAdornment={
                    <InputAdornment position="start">
                      <img
                        src=
                        "https://media.istockphoto.com/photos/indian-flag-badge-picture-id495617382?k=20&m=495617382&s=612x612&w=0&h=19bql2Euoq_JELDmJ2zrxQHrD3eidNHMHWdXacUNmKM="
                      />
                      <select disable="true">
                        <option>India +91</option>
                      </select>
                    </InputAdornment>}
                />
              </div>
              <div className="user-note">By signup, you confirm that you accept our <Link href='#'>Terms and condition</Link> and have read or <Link href='#'>Privacy policy</Link></div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <p className="text-danger fw-bold" style={{ color: 'red' }}>
                {apiError}
              </p>
            </div>
          </div>
          {error !== undefined && (
            <div className="text-danger" style={{ color: 'red' }}>
              {error}
            </div>
          )}
          <Button
            onClick={() => {

              //   BackOpen()
              HandleOtp1SetOpen()
            }}
            variant="contained"
          >send otp
          </Button>
        </div>
      </Dialog>

      {/*  back side dialog  */}
      <Dialog
        open={BOpen}
      >
      </Dialog>

      {/* otp send */}
      <Dialog
        open={HandleOtp1Open}

      >
        <div className="login-modal">
          <div className="close-modal-icon">
            <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' onClick={HandleOtp1SetClose} />
          </div>
          <h2 className="text-center">OTP Varification</h2>
          <div className="otp-verify text-center">
            <h6>Enter otp sent to +91- {number}</h6>
            <img src={mobile2} height="70" width="40" className='mobile-img' />
            {/*    <p>Enter 6 digit code to    {number}</p>*/}
          </div>

          <div className="otp-fg">
            <input autoFocus id="one" type='text' maxLength={1} onChange={handleFocus}
              onBlur={(e) => setCode1(e.target.value)} />
            <input type='text' id="two" maxLength={1} onChange={handleFocus}
              onBlur={(e) => setCode2(e.target.value)} />
            <input type='text' id="three" maxLength={1} onChange={handleFocus}
              onBlur={(e) => setCode3(e.target.value)} />
            <input type='text' id="four" maxLength={1} onChange={handleFocus}
              onBlur={(e) => setCode4(e.target.value)} />
            <input type='text' id="five" maxLength={1} onChange={handleFocus}
              onBlur={(e) => setCode5(e.target.value)} />
            <input type='text' id="six" maxLength={1} onChange={handleFocus}
              onBlur={(e) => setCode6(e.target.value)} />

          </div>
          <div className="row">
            <div className="col-12">
              <p className="text-danger fw-bold" style={{ color: 'red' }}>
                {verifyError}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="text-danger fw-bold" style={{ color: 'red' }}>
                {apiError1}
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              handleVerify()
              document.getElementById("one").value = "";
              document.getElementById("two").value = "";
              document.getElementById("three").value = "";
              document.getElementById("four").value = "";
              document.getElementById("five").value = "";
              document.getElementById("six").value = "";
              document.getElementById("one").focus();

            }}
            variant="contained"
            className='otp-btn'
            disabled={flag}
          >
         {flag === true ? "Please wait ..." : " Submit"}
          </Button>

          {flag ? <>Please Wait.....</> : <></>}
          <div className="otp-note text-center">
            Didn't Receive the OTP? <span>
              {status === STATUS.STOPPED ? (
                <Button onClick={handleResend}
                  variant="contained"
                  className='otp-btn resend'>
                  Resend Code
                </Button>
              ) : (
                <p className="m-0 mt-2 pe-3 tx-12 text-end">
                  {twoDigits(minutesToDisplay)}:{" "}
                  {twoDigits(secondsToDisplay)}
                </p>
              )}
            </span>
          </div>
        </div>
      </Dialog>


      {/*otp sent2 */}
      <Dialog
        open={HandleOtp2Open}

      >
        <div className="login-modal">
          <h2 className="text-center">Enter Who Refer You</h2>
          <div className="otp-verify text-center">
            <img src={refer} height="70" width="40" className='refer-img' />
            <p>Enter 6 digit code</p>
          </div>

          <div className="otp-fg">
            <input autoFocus type='text' maxLength={1} />
            <input type='text' maxLength={1} />
            <input type='text' maxLength={1} />
            <input type='text' maxLength={1} />
            <input type='text' maxLength={1} />
            <input type='text' maxLength={1} />
          </div>

          <Button
            onClick={() => {
              HandleOtp2SetClose()
              HandlePin1SetOpen()
            }}
            className='otp-btn'
            variant="contained"
          >
            submit
          </Button>
          <div className="otp-note text-center">
            <Link href="#">SKIP</Link>
          </div>
        </div>
      </Dialog>


      {/*pin sent */}
      <Dialog
        open={HandlePin1Open}

      >
        <div className="login-modal pin-modal">
          <h2 className="text-center">Create a PIN</h2>
          <div className="otp-verify text-center">
            <img src={lock} height="70" width="40" className='refer-img' />
            <p>This PIN will be used to unlock your app</p>
          </div>

          <div className="mf-group pin-group">
            <label>ENTER YOUR PIN</label>
            <div className="otp-fg">
              <input autoFocus type='text' maxLength={1} />
              <input type='text' maxLength={1} />
              <input type='text' maxLength={1} />
              <input type='text' maxLength={1} />
            </div>
          </div>
          <div className="mf-group pin-group">
            <label>CONFIRM YOUR PIN</label>
            <div className="otp-fg">
              <input type='text' maxLength={1} />
              <input type='text' maxLength={1} />
              <input type='text' maxLength={1} />
              <input type='text' maxLength={1} />
            </div>
          </div>

          <Button
            onClick={() => {
              HandlePin1SetClose()
              HandlePin2SetOpen()
            }}
            variant="contained"
            className='otp-btn'
          >
            Save
          </Button>
        </div>
      </Dialog>

      {/*pin sent 2*/}
      <Dialog
        open={HandlePin2Open}

      >
        <div className="login-modal">
          <h2 className="text-center">Enter PIN</h2>
          <div className="otp-verify text-center">
            <img src={pin} height="70" width="40" className='refer-img' />
            <p>Please enter your PIN</p>
          </div>
          <div className="otp-fg justify-content-evenly otp-fg-small">
            <input autoFocus type='text' maxLength={1} />
            <input type='text' maxLength={1} />
            <input type='text' maxLength={1} />
            <input type='text' maxLength={1} />
          </div>
          <Button
            onClick={() => {
              // HandlePin1SetClose()
              ///   HandlePin2SetOpen()
            }}
            variant="contained"
            className='otp-btn'
          >
            submit
          </Button>
          <div
            onClick={() => {
              HandlePin2SetClose()
              HandleFPinSetOpen()
            }}
            className="otp-note text-center forgot-link"
          >
            Forgot your PIN?
          </div>
        </div>
      </Dialog>


      {/*Forgot pin sent */}
      <Dialog
        open={HandleFPinOpen}

      >

        <div className="login-modal">
          <h2 className="text-center">Forgot Your PIN</h2>
          <div className="otp-verify text-center">
            <img src={lock2} height="70" width="40" className='lock-img' />
            <p>Provide your account’s mobile number for<br></br>which you want to reset your PIN!</p>
          </div>

          <div className='mn-field'>
            <TextField
              autoFocus
              label="Mobile Number"
              variant="outlined"
            />
          </div>

          <Button
            onClick={() => {

              localStorage.setItem("auth", true)
              window.location.reload();
              window.location.href("/")
            }}
            variant="contained"
            className='otp-btn'
          >
            continue
          </Button>
        </div>
      </Dialog>
    </nav>
  )
}
export default Navbar;



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const twoDigits = (num) => String(num).padStart(2, "0");