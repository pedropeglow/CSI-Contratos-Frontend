import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/material";
import contratoSocialImg from "../../assets/contrato-social.png";

const Details = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const Divider = styled("div")(({ theme }) => ({
    width: "13%",
    height: "5px",
    backgroundColor: "#000339",
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  return (
    <Box id="sobrenos" sx={{ py: 10 }}>
      <Container>
        <CustomBox>
          <ImgContainer>
            <img src={contratoSocialImg} alt="pets" style={{ maxWidth: "100%" }} />
          </ImgContainer>

          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: "30px",
                color: "#000339",
                fontWeight: "700",
                my: 3,
              }}
            >
             O CSI te ajuda a abrir sua empresa de forma rápida e prática!
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
            >
              O CSI cria e fornece soluções tecnológicas e inovadoras para
              facilitar o processo burocrático ao gerar Contratos Sociais, com nossa aplicação você não precisa terceirizar o serviço. Faça você mesmo!
            </Typography>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Details;
