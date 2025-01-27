import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

/**
 * D3DownloadButton component provides a button to download the SVG plot
 * in various formats (SVG, PNG, JPG) with the option to select the format.
 *
 * @param {Object} props - Component properties.
 * @param {React.RefObject} props.svgRef - Reference to the SVG element.
 * @returns {JSX.Element} The rendered component.
 */
const D3DownloadButton = ({ svgRef }) => {
  // State to manage the selected download format (default is SVG).
  const [format, setFormat] = useState('svg');

  /**
   * Creates a download link and triggers the download.
   *
   * @param {string} url - The URL of the file to be downloaded.
   * @param {string} filename - The name of the downloaded file.
   */
  const createDownloadLink = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  /**
   * Handles the download process based on the selected format.
   * Converts the SVG to the desired format and triggers the download.
   */
  const handleDownload = () => {
    // Get the SVG element and serialize it to XML format.
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);

    // Create a Blob for the SVG data and an object URL.
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);
    
    if (format === 'svg') {
      // Directly download SVG format.
      createDownloadLink(url, 'chart.svg');
    } else {
      // Convert SVG to image format (PNG or JPG) using a canvas.
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = svg.clientWidth;
        canvas.height = svg.clientHeight;
        
        // Set a white background for JPG format to avoid transparent background.
        if (format === "jpg") {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        // Revoke the object URL and create a new object URL for the image.
        DOMURL.revokeObjectURL(url);

        const imgURL = canvas.toDataURL(`image/${format}`);
        createDownloadLink(imgURL, `chart.${format}`);
      };

      // Set the image source to the object URL of the SVG.
      img.src = url;
    }
  };

  return (
    <form>
      <center>
        <Button onClick={handleDownload} variant="contained" color="primary">
          Download
        </Button>
      </center>
      <center>
        <FormControl>
          <Select value={format} onChange={(e) => setFormat(e.target.value)}>
            <MenuItem value="svg">SVG</MenuItem>
            <MenuItem value="png">PNG</MenuItem>
            <MenuItem value="jpg">JPG</MenuItem>
          </Select>
        </FormControl>
      </center>
    </form>
  );
};

D3DownloadButton.propTypes = {
  svgRef: PropTypes.object.isRequired,
};

export default D3DownloadButton;
