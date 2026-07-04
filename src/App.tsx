import "./index.css";
import { useState } from "react";
import { MenuItem, Select, Slider, InputLabel } from "@mui/material";
import { type JSX } from "react/jsx-runtime";

import image3 from "./assets/images/-3.png";
import image6 from "./assets/images/-6.png";
import image9 from "./assets/images/-9.png";
import image15 from "./assets/images/-15.png";
import image2 from "./assets/images/+2.png";
import image7 from "./assets/images/+7.png";
import image13 from "./assets/images/+13.png";
import image16 from "./assets/images/+16.png";

export function App() {
  const [pos, setPos] = useState([0, 147]);
  const [actOne, setActOne] = useState("");
  const [actTwo, setActTwo] = useState("");
  const [actThree, setActThree] = useState("");
  const [actions, setActions] = useState<JSX.Element[]>([]);

  function computeActions(min: number, max: number): string[] {
    console.log(`Computing actions for range: ${min} to ${max}`);
    const actions: string[] = [];
    const range = max - min;
    const steps = [-3, -6, -9, -15, 2, 7, 13, 16];

    if (range === 0) return actions;

    const queue = [{ position: 0, path: [] as string[] }];
    const visited = new Set([0]);

    while (queue.length > 0) {
      const { position, path } = queue.shift()!;
      for (const step of steps) {
        const newPos = position + step;
        const newPath = [...path, String(step)];
        if (newPos === range) {
          newPath.sort((a, b) => Number(b) - Number(a));
          return newPath;
        }
        if (!visited.has(newPos)) {
          visited.add(newPos);
          queue.push({
            position: newPos,
            path: newPath,
          });
        }
      }
    }
    return actions;
  }

  const actionOffsets: Record<string, number> = {
    "1": -3, // Ударить
    "2": -15, // Протянуть
    "3": 2, // Штамповать
    "4": 7, // Изогнуть
    "5": 13, // Обжать
    "6": 16, // Усадить
    "": 0,
  };

  // Compute payload and send to backend
  async function sendRequest() {
    const min = pos[0];
    const extra =
      -(actionOffsets[actOne] || 0) -
      (actionOffsets[actTwo] || 0) -
      (actionOffsets[actThree] || 0);
    const max = (pos[1] || 0) + extra;

    try {
      let actions = computeActions(min !== undefined ? min : 0, max);
      if (actionOffsets[actThree]) {
        actions.push(String(actionOffsets[actThree]));
      }
      if (actionOffsets[actTwo]) {
        actions.push(String(actionOffsets[actTwo]));
      }
      if (actionOffsets[actOne]) {
        actions.push(String(actionOffsets[actOne]));
      }
      let imgsArr = [];
      for (let act of actions) {
        switch (act) {
          case "-3":
            imgsArr.push(<img key={imgsArr.length} src={image3} alt="-3" />);
            break;
          case "-6":
            imgsArr.push(<img key={imgsArr.length} src={image6} alt="-6" />);
            break;
          case "-9":
            imgsArr.push(<img key={imgsArr.length} src={image9} alt="-9" />);
            break;
          case "-15":
            imgsArr.push(<img key={imgsArr.length} src={image15} alt="-15" />);
            break;
          case "2":
            imgsArr.push(<img key={imgsArr.length} src={image2} alt="+2" />);
            break;
          case "7":
            imgsArr.push(<img key={imgsArr.length} src={image7} alt="+7" />);
            break;
          case "13":
            imgsArr.push(<img key={imgsArr.length} src={image13} alt="+13" />);
            break;
          case "16":
            imgsArr.push(<img key={imgsArr.length} src={image16} alt="+16" />);
            break;
          default:
            break;
        }
      }
      setActions(imgsArr);
    } catch (err) {
      console.error("Request failed", err);
    }
  }

  let marks = [];
  for (let i = 0; i < 15; i++) {
    marks.push({ value: i * 10, label: String(i * 10) });
  }

  return (
    <div className="App text-center text-2xl w-150">
      <div className="flex justify-center gap-10 py-5">
        <div className="">
          <label htmlFor="first-action-select" className="block mb-2">
            Первое действие
          </label>
          <Select
            name="firstAction"
            id="first-action-select"
            value={actOne}
            onChange={(e) => setActOne(e.target.value)}
            defaultValue="0"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "& .MuiSelect-icon": {
                color: "#ffffff",
              },
            }}
          >
            <MenuItem value="0"> — </MenuItem>
            <MenuItem value="1">
              <img src={image3} alt="Ударить" />
            </MenuItem>
            <MenuItem value="2">
              <img src={image15} alt="Протянуть" />
            </MenuItem>
            <MenuItem value="3">
              <img src={image2} alt="Штамповать" />
            </MenuItem>
            <MenuItem value="4">
              <img src={image7} alt="Изогнуть" />
            </MenuItem>
            <MenuItem value="5">
              <img src={image13} alt="Обжать" />
            </MenuItem>
            <MenuItem value="6">
              <img src={image16} alt="Усадить" />
            </MenuItem>
          </Select>
        </div>
        <div className="">
          <label htmlFor="second-action-select" className="block mb-2">
            Второе действие
          </label>
          <Select
            name="secondAction"
            id="second-action-select"
            value={actTwo}
            onChange={(e) => setActTwo(e.target.value)}
            defaultValue="0"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "& .MuiSelect-icon": {
                color: "#ffffff",
              },
            }}
          >
            <MenuItem value="0"> — </MenuItem>
            <MenuItem value="1">
              <img src={image3} alt="Ударить" />
            </MenuItem>
            <MenuItem value="2">
              <img src={image15} alt="Протянуть" />
            </MenuItem>
            <MenuItem value="3">
              <img src={image2} alt="Штамповать" />
            </MenuItem>
            <MenuItem value="4">
              <img src={image7} alt="Изогнуть" />
            </MenuItem>
            <MenuItem value="5">
              <img src={image13} alt="Обжать" />
            </MenuItem>
            <MenuItem value="6">
              <img src={image16} alt="Усадить" />
            </MenuItem>
          </Select>
        </div>
        <div className="">
          <label htmlFor="third-action-select" className="block mb-2">
            Третье действие
          </label>
          <Select
            name="thirdAction"
            id="third-action-select"
            value={actThree}
            onChange={(e) => setActThree(e.target.value)}
            defaultValue="0"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffffff",
              },
              "& .MuiSelect-icon": {
                color: "#ffffff",
              },
            }}
          >
            <MenuItem value="0"> — </MenuItem>
            <MenuItem value="1">
              <img src={image3} alt="Ударить" />
            </MenuItem>
            <MenuItem value="2">
              <img src={image15} alt="Протянуть" />
            </MenuItem>
            <MenuItem value="3">
              <img src={image2} alt="Штамповать" />
            </MenuItem>
            <MenuItem value="4">
              <img src={image7} alt="Изогнуть" />
            </MenuItem>
            <MenuItem value="5">
              <img src={image13} alt="Обжать" />
            </MenuItem>
            <MenuItem value="6">
              <img src={image16} alt="Усадить" />
            </MenuItem>
          </Select>
        </div>
      </div>
      <div className="flex justify-between pb-5">
        <p className="">Начальная позиция: {pos[0]}</p>
        <p className="">Конечная позиция: {pos[1]}</p>
      </div>
      <Slider
        valueLabelDisplay="auto"
        step={1}
        min={0}
        max={147}
        value={pos}
        onChange={(e: Event, newValue: number[]) => {
          setPos(newValue);
        }}
        sx={{
          "& .MuiSlider-markLabel": {
            color: "white",
          },
          '.MuiSlider-thumb[data-index="0"]': {
            color: "#00c853",
          },
          '.MuiSlider-thumb[data-index="1"]': {
            color: "#ff1744",
          },
        }}
        marks={marks}
        track={false}
      />
      <div className="py-6 mt-8 flex gap-4 justify-center items-center min-h-24">
        {actions.length > 0 ? (
          actions
        ) : (
          <p className="text-lg italic">
            Здесь будет показан лучший набор действий
          </p>
        )}
      </div>
      <button onClick={sendRequest} className="bg-blue-500 rounded-xl p-2">
        Найти лучший набор действий
      </button>
    </div>
  );
}

export default App;
