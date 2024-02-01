//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

async function fetchFloodAssetDataFromBackend(){
  //getting URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const floodStationId = urlParams.get('flood-station-id')
  const searchRadius =urlParams.get('searchRadius')
  
  // Fetch data from your backend
  //`http://localhost:3000/fetch-assets-by-flood-station-id/E8980?radius=5`)
  
  try{
    const response = await fetch(`http://localhost:3000/fetch-assets-by-flood-station-id/${floodStationId}?radius=${searchRadius}`)
    const assetData = await response.json();
  
    // Now you have your data and you can use it in your frontend
    console.log(assetData);
  
    const dataDiv = document.getElementById('dataDiv');
  
    const assetDataTable = document.createElement('table');
  
    assetData.forEach(element => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
  
    //creating link and set its url to the item
    const assetDataHyperLink = document.createElement('a');
    assetDataHyperLink.href = element
    assetDataHyperLink.textContent = element
    
    //when a link is clicked a new tab will open
    assetDataHyperLink.target ="_blank"
  
    cell.appendChild(assetDataHyperLink);
    row.appendChild(cell);
  
    assetDataTable.appendChild(row);
  
    })
  
    // Display it in the 'dataDiv' div
  dataDiv.appendChild(assetDataTable);
  
  } catch(error){
    console.error('Error:',error);
  }
    }

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
  fetchFloodAssetDataFromBackend()
})
