import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;

export const FormContainer = styled.form`
  width: 100%;
  /* margin-right: 25px; */
  /* margin-top: 5px; */
  margin: auto;
  display: flex;
  flex-direction: column;
  /* box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19); */
`;

export const ProfileInfoContainer = styled.form`
  width: 100%;
  /* margin-right: 25px;
  margin-top: 5px; */
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const MutedLink = styled.p`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(26, 188, 156);
  font-weight: 500;
  text-decoration: none;
`;

export const EditLink = styled.a`
  font-size: 12px;
  color: rgb(26, 188, 156);
  font-weight: 500;
  text-decoration: none;
  margin-left: 300px;
  margin-bottom: 20px;
  margin-top: -70px;
  position: relative;
`;

export const Input = styled.input`
  /* width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(200, 200, 200, 1); */
  /* }

  &:not(:last-type-of) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(26, 188, 156);
  } */
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  /* color: #fff; */

  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: linear-gradient(
    90deg,
    rgba(26, 188, 156, 1) 20%,
    rgba(0, 153, 255, 1) 98%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;

export const SmallText = styled.h5`
  color: #534f4f;
  font-weight: 500;
  font-size: 11px;
  z-index: 5;
  margin: 0;
  margin-bottom: 7px;
  text-align: center;
`;

export const TitleText = styled.h4`
  color: #918787;
  font-weight: 500;
  font-size: 15px;
  border-bottom: 2px solid rgba(26, 188, 156, 1);
  z-index: 5;
  margin: 0;
  margin-top: -35px;
  margin-bottom: 25px;
  width: 238px;
`;

export const NameText = styled.h2`
  font-weight: 500;
  font-size: 2em;
  z-index: 5;
  margin: 0;
  margin-top: 7px;
  text-align: center;
`;

export const BioText = styled.h4`
  font-weight: 500;
  font-size: 11px;
  z-index: 5;
  margin: 0;
  margin-top: 7px;
  margin-bottom: 10px;
  text-align: center;
`;

export const CenterIcon = styled.h5`
  color: #534f4f;
  font-weight: 500;
  font-size: 11px;
  z-index: 5;
  margin: 0;
  text-align: center;
`;

export const BorderSeperator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin-left: 85px;
  
  border-bottom: 1.5px solid rgba(26, 188, 156, 1);
  
`;

export const BorderReviewSeperator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 430px;
  margin-left: 85px;
  margin-bottom: 20px;
  
  border-bottom: 1.5px solid rgba(26, 188, 156, 1);
  
`;