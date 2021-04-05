import React, { useState } from 'react';

declare var ZoomMtg

ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

export default function Join() {
    const [state, setState] = useState({ meetingId: '', passcode: '' });

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
            meetingNumber: state.meetingId,
            role: 1,
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
              signature: signature,
              meetingNumber: state.meetingId,
              userName: REACT_APP_USERNAME,
              apiKey: REACT_APP_ZOOM_API_KEY,
              passWord: state.passcode,
              success: success => console.log('Join success: ', success),
              error: error => console.error('Error joining meeting: ', error),
            })
          },
          error: error => console.error('init error', error),
        })
      }

      return (
        <div className="flex-container">
          <input
            className="form-control"
            value={state.meetingId}
            // replace white spaces in meeting id, if any
            onChange={e => setState({ meetingId: e.target.value.replaceAll(/\s/g,''), passcode: state.passcode })}
            placeholder="Meeting ID"
          />
          <input
            className="form-control"
            value={state.passcode}
            onChange={e => setState({ meetingId: state.meetingId, passcode: e.target.value })}
            placeholder="Meeting Passcode (optional)"
          />
          <button
            className="btn btn-primary"
            type="button"
            disabled={!state.meetingId.length}
            onClick={getSignature}
          >
            Join
          </button>
        </div>
      );
}