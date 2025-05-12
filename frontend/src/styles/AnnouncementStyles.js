// AnnouncementStyles.js
import styled from 'styled-components';

export const AnnouncementHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;


export const AnnouncementTitle = styled.h3`
  margin-bottom: 10px;
`;

export const AnnouncementContainer = styled.div`
  display: flex;
  flex-direction: row; /* Ensure the sidebar and announcement section are aligned horizontally */
  min-height: 100vh; /* Make the container cover the full height of the screen */
`;

export const SidebarContainer = styled.div`
  flex: 0 0 240px; /* Fixed width for the sidebar */
  height: 100vh; /* Full height to make it static */
  background-color: #f5f5f5; /* Optional background color for clarity */
  position: fixed; /* Keep the sidebar fixed */
  top: 0;
  left: 0;
  overflow-y: auto; /* Enable scrolling for longer sidebar content */
  padding: 20px; /* Add some padding for the sidebar content */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 240px; /* Create space for the fixed sidebar */
  padding: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const AnnouncementForm = styled.form`
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const AnnouncementList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AnnouncementItem = styled.li`
  margin-bottom: 10px;
`;

export const AnnouncementContent = styled.p`
  font-size: 16px;
`;

// AnnouncementStyles.js

export const AnnouncementCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
`;