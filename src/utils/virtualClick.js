export default function click ({x, y}){
    const elements = document.elementsFromPoint(x, y);
    if(elements.length === 0) return;
    let desc;
    if(elements[0].id === 'virtualMouse'){
        desc = 1;
    }else{
        desc = 3;
    }
    const element = elements[desc];
    console.log('click coordenadas', {x, y});
    console.log('click no elemento', element);
    console.log('click nos elementos', elements);
    if(element){
        try {
            element.click();
        } catch {
            alert('Erro Click')
            element.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        }
    }
}