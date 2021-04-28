import { createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const innerButtons = makeStyles({
    outlined: {
        "&:hover": {
            backgroundColor: "#222831",
            color: "#f7fbfc"
        },
        backgroundColor: "#171c22",
    }
})

const outterButtons = makeStyles({
    outlined: {
        "&:hover": {
            backgroundColor: "#222831",
            color: "#f7fbfc"
        },
        backgroundColor: "#393e46",
    }
})

const userDataPaperSmall = makeStyles({
    root: {
        height: "80x",
        width: "260px",
        backgroundColor: "#222831",
        paddingBottom: "20px",
    }
})

const innerDataPaper = makeStyles({
    root: {
        height: "30px",
        width: "auto",
        paddingRight: "10px",
        paddingLeft: "10px",
        backgroundColor: "#ffd369",
        color: "#222831",
        fontWeight: "bold",
        paddingTop: "5px"
    }
})

const userDataPaperBig = makeStyles({
    root: {
        height: "300px",
        width: "550px",
        backgroundColor: "#222831",
        paddingBottom: "20px"
    }
})

const disabledCheckboxIndUser = makeStyles({
    root: {
        "&.Mui-disabled": {
            color: "#ffd369",
        },
    }
})

const loginAndCreateUser = makeStyles({
    root: {
        width: "auto",
        paddingLeft: "20px",
        paddingRight: "20px"
    }
})

const styles = makeStyles({
    textFieldStyle: {
        color: "secondary",
        borderColor: "#FFFFFF",
        border: 1,
        InputLabelProps: {
            color: "white !important"
        }
    },
})

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                background: "#222831",
                border: 0,
                borderRadius: 5,
                color: '#f7fbfc',
                padding: '0 60px',
                width: '150px',
            }
        },
        MuiInputLabel: {
            root: {
                color: "#f7fbfc",
            },
        },
        MuiFilledInput: {
            root: {
                color: "#f7fbfc",
            },
        },
        MuiContainer: {
            root: {
                backgroundColor: "#222831",
                color: "#f7fbfc",
                textAlign: "center",
                fontFamily: "Calibri",
                fontSize: 20,
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            },
        },
        MuiFormHelperText: {
            root: {
                color: "#f7fbfc",
            }
        },
        MuiSelect: {
            root: {
                color: "#f7fbfc"
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: "#393e46",
                color: "#f7fbfc",
                paddingTop: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                width: "600px",
                textAlign: "center",
            },
        },
        MuiAppBar: {
            root: {
                margin: 0,
            }
        },
        MuiTextField: {
            root: {
                width: "300px"
            }
        },
        MuiSkeleton: {
            root: {
                margin: "15px",
                borderRadius: 5
            }
        },
        MuiPaginationItem: {
            root: {
                backgroundColor: "#393e46"
            }
        },
    },
    palette: {
        primary: {
            main: "#f7fbfc"
        },
        secondary: {
            main: "#ffd369"
        }
    },
    props: {
        MuiTextField: {
            variant: "filled",
            size: "small"
        },
        MuiButton: {
            variant: "outlined"
        },
        MuiPaper: {
            elevation: 5
        },
        MuiContainer: {
            maxWidth: false
        },
        MuiSkeleton: {
            variant: "rect"
        },
        MuiPagination: {
            variant: "outlined",
            color: "secondary",
            size: "large"
        }
    },
    shape: {
        borderRadius: 5
    },
    spacing: 8,
    typography: {
        fontFamily: "Helvetica",
        fontSize: 16
    },

})

const ButtonStyled = () => {
    const classes = innerButtons();
    return <Button className={classes.outlined}>Test</Button>
}

export { ButtonStyled, theme, innerButtons, styles, outterButtons, userDataPaperSmall, userDataPaperBig, innerDataPaper, disabledCheckboxIndUser, loginAndCreateUser }