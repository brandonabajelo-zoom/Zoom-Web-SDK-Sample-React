import React, { useState } from 'react';

declare var ZoomMtg

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

export default function Join() {
    const [state, setState] = useState({ meetingNumber: '', passWord: '', role: 1 });
    const { meetingNumber, passWord, role } = state;

    const {
      REACT_APP_ZOOM_API_KEY = '', REACT_APP_SIGNATURE_ENDPOINT = '',
      REACT_APP_LEAVE_URL = '', REACT_APP_USERNAME = '',
    } = process.env;

    const getSignature = e => {
        e.preventDefault();

        const SIGNATURE_OPTIONS = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            meetingNumber,
            role: parseInt(role, 10),
          })
        };
    
        fetch(REACT_APP_SIGNATURE_ENDPOINT, SIGNATURE_OPTIONS)
          .then(data => data.json())
          .then(({ signature }) => !!signature && startMeeting(signature))
      }
    
      const startMeeting = signature => {
        document.getElementById('zmmtg-root').style.display = 'block'
        ZoomMtg.init({
          leaveUrl: REACT_APP_LEAVE_URL,
          isSupportAV: true,
          success: (success) => {
            console.log('init success', success)
    
            ZoomMtg.join({
              signature,
              meetingNumber,
              userName: REACT_APP_USERNAME,
              apiKey: REACT_APP_ZOOM_API_KEY,
              passWord,
              success: success => console.log('Meeting join success: ', success),
              error: error => console.error('Error joining meeting: ', error),
            })
          },
          error: error => console.error('init error', error),
        })
      }

      return (
        <>
        <div className="flex-container">
          <input
            className="form-control"
            value={meetingNumber}
            // replace white spaces in meeting id, if any
            onChange={e => setState({ meetingNumber: e.target.value.replaceAll(/\s/g,''), passWord, role })}
            placeholder="Meeting ID"
          />
          <input
            className="form-control"
            value={passWord}
            onChange={e => setState({ meetingNumber, passWord: e.target.value, role })}
            placeholder="Meeting Passcode (optional)"
          />
          </div>
          <div className="flex-radio">
            <div className="flex">
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline2"
                  className="custom-control-input"
                  checked={role === 1}
                  onChange={() => setState({ meetingNumber, passWord, role: 1 })}
                />
                &nbsp;
                <label className="custom-control-label" htmlFor="customRadioInline2">Start Meeting</label>
              </div>
              &nbsp;&nbsp;&nbsp;
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="customRadioInline1"
                  className="custom-control-input"
                  checked={role === 0}
                  onChange={() => setState({ meetingNumber, passWord, role: 0 })}
                />
                &nbsp;
                <label className="custom-control-label" htmlFor="customRadioInline1">Join Meeting</label>
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              disabled={!meetingNumber.length}
              onClick={getSignature}
            >
              {role === 0 ? 'Join Meeting' : 'Start Meeting'}
            </button>
          </div>
        </>
      );
}