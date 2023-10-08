import { useCallback, useEffect, useState, useRef} from "react";
import {
  Container,
  Button,
  TextField,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [passLength, setPassLength] = useState(8);
  const [copied, setCopied] = useState(false)
  const textFieldRef = useRef(null)

  const copyTextFromField = ()=> {
    window.navigator.clipboard.writeText(password)
  }

  const generatePassword = useCallback(() => {
    // create a hash
    let pass = "";
    let hash = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // allow Characters in the hash
    if (allowChar) hash = hash + "!@#$%^&*()_+-=[]{};:',.<>?";
    // allow Numbers in the hash
    if (allowNumbers) hash = hash + "0123456789";

    for (let i = 0; i < passLength; i++) {
      pass += hash[Math.floor(Math.random() * hash.length)];
    }
    setPassword(pass);
  }, [allowChar, allowNumbers, passLength]);

  useEffect(
    () => {generatePassword(); setCopied(false)},
    [allowChar, allowNumbers, passLength, generatePassword]
  );
  return (
    <div className="container-main">
      <Container fixed>
        <Typography variant="h4" component="h2">
          Password Generator
        </Typography>
        <div className="form">
          <div className="form-header">
            <TextField
              id="outlined-basic"
              label="Password"
              value={password}
              style={{ width: "100%" }}
              variant="outlined"
              ref={textFieldRef}
            />
            <Button variant="contained" size="large" onClick={copyTextFromField} onClickCapture={()=>setCopied(true)}>
             {!copied ? "Copy" : "Copied"}
            </Button>
          </div>
          <div className="form-footer">
            <Slider
              min={8}
              max={50}
              value={passLength}
              aria-label="Default"
              onChange={(e) => setPassLength(e.target.value)}
              style={{ width: "50%" }}
              valueLabelDisplay="auto"
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => setAllowNumbers((prev) => !prev)}
                    value={allowNumbers}
                  />
                }
                label="Numbers"
              />
              <FormControlLabel
                required
                control={
                  <Checkbox
                    onChange={() => setAllowChar((prev) => !prev)}
                    value={allowChar}
                  />
                }
                label="Charactors"
              />
            </FormGroup>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
