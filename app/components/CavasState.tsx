import { Rectangle, Circle, Triangle, Brush, Eraser, Text, Upload } from '../assets';
import { RefObject, useEffect, useRef, useState } from 'react'
import { create } from '../actions'
import {
  Canvas,
  TEvent,
  FabricObject,
  Rect,
  Circle as FCircle,
  Triangle as FTriangle,
  IText,
  PencilBrush,
  FabricImage,
  ModifiedEvent
} from "fabric";


type ObjectSelectedCreatedEvent = Partial<TEvent> & {
  selected: FabricObject[];
};


const CanvasState = () => {
  const fabricCanvas: RefObject<null | Canvas> = useRef(null);
  const bg: RefObject<null | FabricImage> = useRef(null);
  const [userInputText, setUserInputText] = useState('');
  const [textSearching, setTextSearching] = useState('');
  const [colorSelect, setColorSelect] = useState('blue');
  const [objectSelectForDelete, setObjectSelectForDelete] = useState(false);
  const colorList = ['red', 'green', 'blue', 'gray', 'tomato', 'orange'];

  // const [postImage,]
  // const [rawImg, setRawImg] = useState<string | null>(null);
  // const [prdImg, setPrdImg] = useState<string | null>(null);

  // const createWithImg = create.bind(null, FabricImage);

  const objectSelected = (o: ObjectSelectedCreatedEvent) => {
    // console.log(o)

    // if value is undefined, exit form this function...
    if (o?.e === undefined || o?.selected[0] === undefined) return;

    const selectedObj = o?.selected[0];
    console.log(selectedObj.type)

    // if (selectedObj.type) {
    //   setObjectSelectForDelete(true)
    //   console.log('inside ==> ', objectSelectForDelete);
    //   console.log('=================================');
    // }


    // selectedObj.set('fill', colorSelect);
    // fabricCanvas.current?.renderAll();

    // console.log(e.target.fill)
    // console.log(e.e)
    // console.log(e.selected)

    // e.selected[0].fill = colorSelect;

    // if (selectedObject) {
    //   console.log(selectedObject);
    //   setObjectSelectForDelete(true);
    // } else {
    //   setObjectSelectForDelete(false);
    // }
  }

  const objectModified = (o: ModifiedEvent) => {
    console.log(o)
  }

  useEffect(() => {
    const init = async () => {
      bg.current = await FabricImage.fromURL('/background.png');
      console.log(bg.current);

      fabricCanvas.current = new Canvas("canvas", {
        width: 1575,
        height: 3150,
        overlayImage: bg.current
      })

      fabricCanvas.current.renderAll();

      fabricCanvas.current.on({
        'selection:created': objectSelected,
        'selection:updated': objectSelected,
        'object:modified': objectModified,
      });

      fabricCanvas.current.on('mouse:down', () => {
        setObjectSelectForDelete(false)
      });

      if (fabricCanvas.current.getElement().parentNode) {
        const parent = fabricCanvas.current.getElement().parentNode as HTMLElement;
        parent.style.transform = 'scale(0.25)';
        parent.style.position = 'absolute'
        parent.style.top = '0px'
        parent.style.left = '0px'
        parent.style.transformOrigin = 'top left'
      }
    };

    init();

    return () => {
      fabricCanvas.current?.dispose().then(() => console.log('Canvas disposed2222...'))
    }
  }, []);

  const drawRectangle = () => {
    const rect = new Rect({
      id: 'rectangle',
      top: (fabricCanvas.current?.height ?? 0 - 50) * Math.random(),
      left: (fabricCanvas.current?.width ?? 0 - 50) * Math.random(),
      width: 50,
      height: 50,
      fill: colorSelect,
      objectCaching: false,
      padding: 10,
    });

    // Render Rectangle on Canvas
    fabricCanvas.current?.add(rect);
  }


  // ⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪⚪
  const drawCircle = () => {
    const canvasCenter = fabricCanvas.current?.getCenterPoint();
    const circle = new FCircle({
      id: 'circle',
      top: canvasCenter?.x ?? 0,
      left: canvasCenter?.y ?? 0,
      radius: 50,
      originX: 'center',
      originY: 'center',
      fill: colorSelect,
      cornerColor: colorSelect,
      objectCaching: false,
      padding: 10,
    });

    // Render Circle on Canvas
    fabricCanvas.current?.add(circle);
  }


  const drawTriangle = () => {
    const triangle = new FTriangle({
      id: 'triangle',
      top: 150,
      left: 150,
      width: 100,
      height: 100,
      fill: colorSelect,
      objectCaching: false,
    });

    // Render Rectangle on Canvas
    fabricCanvas.current?.add(triangle);
  }


  // 📝📝📝📝📝📝📝📝📝📝📝
  const drawText = () => {
    // Create a new Text instance

    // const text = new Text(userInputText, {
    //   id: 'text',
    //   top: 150,
    //   left: 150,
    //   fill: colorSelect
    // });

    // after click on icon, courser change... 
    // canvas.set({ hoverCursor: "text" })

    const text = new IText(userInputText,
      {
        editable: true,
        left: (fabricCanvas.current?.width ?? 0 - 50) * Math.random(),
        top: (fabricCanvas.current?.height ?? 0 - 50) * Math.random(),
        fontSize: 60,
        fill: colorSelect
      }
    );

    // Render Text on Canvas
    fabricCanvas.current?.add(text)

    // canvas.setActiveObject(text)
    // text.enterEditing()
    // text.hiddenTextarea.focus()
  }

  const displayAllObj = () => {

    fabricCanvas.current?.getObjects().forEach(obj => {

      // console.log(obj.aCoords.tl,)
      console.log(obj);

      if (fabricCanvas.current?.getActiveObject() === obj) {
        console.log('Selected Object ====> ', obj)
        // obj.hasBorders = false
        // obj.hasControls = false
        // obj.selectable = false
        // obj.lockRotation  = true
        // obj.lockScalingX = obj.lockScalingY = true;
        // obj.lockMovementX = true
        // obj.lockMovementY = true
        // obj.hoverCursor = 'pointer';
      }

    });
  }


  const drawing = () => {
    if (!fabricCanvas.current) return;

    fabricCanvas.current.freeDrawingBrush = new PencilBrush(fabricCanvas.current); // PatternBrush
    fabricCanvas.current.freeDrawingBrush.width = 5;
    fabricCanvas.current.isDrawingMode = true;

    fabricCanvas.current.on('mouse:up', () => fabricCanvas.current!.isDrawingMode = false);
  }

  const eraseDrawing = () => {
    if (!fabricCanvas.current) return;

    // //  same as `PencilBrush`
    // fabricCanvas.current.freeDrawingBrush = new EraserBrush(canvas);
    // frbricCanvas.current.freeDrawingBrush.width = 10;
    // fabricCanvas.current.isDrawingMode = true;
    // //  optional
    // canvas.freeDrawingBrush.width = 10;

    // //  undo erasing
    // canvas.freeDrawingBrush.inverted = true;

  }

  // canvas drawing - save as image & download it...
  const saveAsImg = () => {

    if (!fabricCanvas.current) return;
    if (bg.current != null) {
      console.log('remove bg');
      fabricCanvas.current?.remove(bg.current);
      fabricCanvas.current?.discardActiveObject()
    }
    if (bg.current != null) {
      console.log('remove bg');
      fabricCanvas.current.overlayImage = undefined;
      fabricCanvas.current?.discardActiveObject();
    }
    const ext = "png";
    const base64 = fabricCanvas.current?.toDataURL({
      multiplier: 1,
      format: ext,
      enableRetinaScaling: true
    });
    if (!base64) return;

    const link = document.createElement("a");
    link.href = base64;
    link.download = `${new Date()}.${ext}`;
    link.click();
  }

  // delete selected one...canvas.discardActiveObject().renderAll()
  // 🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯🎯
  const delete_selected_object = () => {
    fabricCanvas.current?.remove(...fabricCanvas.current?.getActiveObjects())
    fabricCanvas.current?.discardActiveObject()
  }


  // delete all...
  const delete_all_object_from_canvas = () => fabricCanvas.current?.getObjects().forEach(obj => fabricCanvas.current?.remove(obj))


  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTextSearching(e.target.value);

    if (fabricCanvas.current && Object.keys(fabricCanvas.current).length !== 0) {
      // canvas.getObjects().forEach((obj: FabricObject) => {
      //   if ('text' in obj && obj.text?.includes(textSearching)) {
      //     const text = canvas.setActiveObject(obj);
      //     console.log(text);
      //     console.log(obj.text);
      //   }
      // });
    }
  }

  // useEffect(() => {
  //   console.log(canvas !== undefined);
  //   // loop through all objects, that present inside canvas
  //   if(Object.keys(canvas).length !== 0){
  //     canvas.getObjects().forEach(obj => {

  //       if (obj?.text?.includes(textSearching)) {

  //         // select js object programmatically
  //         canvas.setActiveObject(obj)
  //         console.log(obj?.text)
  //       }
  //     })
  //   }

  // }, [textSearching,canvas])

  const uploadFile = () => {
    const filedom = document.getElementById('file');
    filedom?.click()
  }

  const fileinputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileData = event.target.files ? event.target.files[0] : null;
    console.log(fileData);
    // 获取到的文件 fileData
    // if(fileData){
    //   this.setState({ fileData, })
    //   const formdata = new FormData();
    //   formdata.append("wordType",3);
    //   formdata.append("file",fileData);
    //   this.send(formdata)
    // }
    console.log("add image");
    FabricImage.fromURL(URL.createObjectURL(fileData)).then((img) => {
      fabricCanvas.current?.add(img)
    })
  }


  return (
    <div>

      <div className='flex gap-4 items-center'>
        <Rectangle className='ml-1 cursor-pointer duration-200 hover:text-red-500' onClick={drawRectangle} />
        <Circle className='cursor-pointer duration-200 hover:text-red-500' onClick={drawCircle} />
        <Triangle className='cursor-pointer duration-200 hover:text-red-500' onClick={drawTriangle} />
        <Brush className='cursor-pointer duration-200 hover:text-red-500' onClick={drawing} />
        <Eraser className='cursor-pointer duration-200 hover:text-red-500' onClick={eraseDrawing} />
        <Text className='cursor-pointer duration-200 hover:text-red-500' onClick={drawText} />
        <Upload className='cursor-pointer duration-200 hover:text-red-500' onClick={uploadFile} />

        <input
          type="text"
          value={userInputText}
          placeholder='input text...'
          className='px-2 py-1 outline-none'
          onChange={e => setUserInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && [drawText(), setUserInputText('')]}
        />

        <input id="file" type="file" accept=".jpg,.png,.jpeg"
          style={{ display: "none", }}
          onChange={fileinputChange}
        />

        <div className='ml-auto space-x-4'>
          <input
            className='px-2 py-1 outline-none'
            placeholder='text searching by typing...'
            type="text"
            value={textSearching}
            onChange={handleSearchText}
            onKeyDown={e => e.key === 'Enter' && [drawText(), setTextSearching('')]}
          />

          <button className={`px-2 py-1 rounded-sm ${objectSelectForDelete ? 'bg-red-400 ' : 'bg-gray-400 '}`} onClick={() => delete_selected_object()}>Delete it</button>
          {/* <button className={`px-2 py-1 rounded-sm bg-red-400`} onClick={() => delete_selected_object()}>Delete it</button> */}
          <button className='px-2 py-1 bg-gray-500 hover:bg-red-500 duration-200 rounded-sm text-white' onClick={() => delete_all_object_from_canvas()}>Clear Canvas</button>
        </div>

      </div>

      <div className=' flex justify-between items-center'>
        <div className='flex items-center gap-4 my-2'>
          <div className='flex gap-2 my-2'>
            {
              colorList.map(color =>
                <div
                  key={color}
                  onClick={() => setColorSelect(color)}
                  style={{ backgroundColor: color }}
                  className='w-6 h-6 rounded-full cursor-pointer hover:opacity-60 duration-200'>
                </div>
              )
            }
          </div>

          <p onClick={displayAllObj} className='underline cursor-pointer'>show all at console</p>

        </div>

        <div>
          {/* <p onClick={saveImgDataToInput} className='bg-gray-400 px-2 py-1 cursor-pointer duration-200 hover:text-gray-100'>save img data</p> */}
          <p onClick={saveAsImg} className='bg-gray-400 px-2 py-1 cursor-pointer duration-200 hover:text-gray-100'>save as img</p>
        </div>
      </div>

      <div className='flex justify-between items-center relative'>
        <canvas id="canvas" />
      </div>

    </div>
  )
}

export default CanvasState
